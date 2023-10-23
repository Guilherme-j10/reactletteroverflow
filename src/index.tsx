import { useEffect, useRef } from "react";
import { MeasureTextPropsType } from "./Dtos";

type Props = {
  children: (props: React.MutableRefObject<HTMLParagraphElement>) => React.ReactNode,
  enable_title?: boolean,
  delimiter?: string,
  content?: string
}

export const ReactLetterOverflow: React.FC<Props> = ({ children, enable_title, delimiter, content }) => {

  const element_text = useRef({} as HTMLParagraphElement);
  const observability_parent = useRef({} as MutationObserver);
  const resize_observer = useRef({} as ResizeObserver);

  const default_end = '...';//!delimiter ? '...' : delimiter;
  const attribute_name = 'storage-content';

  const overflow_logic = (): void => {

    const is_enable_title = !enable_title ? true : enable_title;
    let get_attrs = element_text.current.getAttribute(attribute_name);

    if (get_attrs === null) {

      element_text.current.setAttribute(attribute_name, element_text.current.innerText);
      element_text.current.innerText = '';

      overflow_logic();

      return;

    }

    const information = element_text.current.innerText;

    if ((information.length > get_attrs.length) && information.length) {

      if (!content) {

        element_text.current.setAttribute(attribute_name, information);
        get_attrs = information;

      }

    }

    element_text.current.innerText = '';

    const parse_font = (content: string, font_size: string, font_family: string): MeasureTextPropsType => {

      const canvas_element = document.createElement('canvas');
      const ctx = canvas_element.getContext('2d') as CanvasRenderingContext2D;

      ctx.font = `${font_size} ${font_family}`;

      const get_metrics = (text: string) => ctx.measureText(text).width;

      const get_avarage = () => {

        let avarage_relation = .3;
        let nums = [];

        for (let char of content.split(''))
          nums.push(get_metrics(char))

        const final_sum = nums.reduce((acc, data) => acc += data, 0);
        return (final_sum / nums.length) + avarage_relation;

      }

      return {
        complete_width: get_metrics(content),
        avarage_width: get_avarage(),
        characters_amount: content.length,
        characters_list: content.split('').map((data) => ({
          char: data,
          self_d: get_metrics(data)
        }))
      };

    }

    const parent_container = element_text.current.parentElement as HTMLDivElement;

    let current_width = parent_container.clientWidth;

    current_width -= parseInt(window.getComputedStyle(parent_container).paddingRight.split('px')[0]);
    current_width -= parseInt(window.getComputedStyle(parent_container).paddingLeft.split('px')[0]);

    for (let i = 0; i < parent_container.childElementCount; i++) {

      const current_child_node = parent_container.childNodes[i] as HTMLDivElement;
      const is_own_node = current_child_node.getAttribute(attribute_name);

      if (typeof is_own_node === 'string') {

        current_width -= parseInt(window.getComputedStyle(current_child_node).marginRight.split('px')[0]);
        current_width -= parseInt(window.getComputedStyle(current_child_node).marginLeft.split('px')[0]);

        continue;

      }

      current_width -= current_child_node.clientWidth;
      current_width -= parseInt(window.getComputedStyle(current_child_node).marginRight.split('px')[0]);
      current_width -= parseInt(window.getComputedStyle(current_child_node).marginLeft.split('px')[0]);

    }

    const font_size = window.getComputedStyle(element_text.current).fontSize;
    const font_family = window.getComputedStyle(element_text.current).fontFamily
    const font_metrics = parse_font(get_attrs, font_size, font_family);
    const default_end_metrics = parse_font(default_end, font_size, font_family);
    const space_adjustment = font_metrics.characters_list.reduce((acc, data) => acc > data.self_d ? acc : data.self_d, 0);

    const enebled_characters = Math.ceil(Math.abs(current_width / font_metrics.avarage_width));
    let real_width_of_chars = 0;

    let overflow_str = Array.from({
      length: Math.abs(enebled_characters - (default_end_metrics.characters_amount))
    }).map((_, index) => {

      real_width_of_chars += font_metrics.characters_list[index]?.self_d || 0;
      return font_metrics.characters_list[index]?.char || ''

    }).join('');

    real_width_of_chars = real_width_of_chars + default_end_metrics.characters_list.reduce((acc, data) => acc += data.self_d, 0) + space_adjustment;
    overflow_str = Array.from({ length: (current_width / (real_width_of_chars / overflow_str.length)) }).map((_, index) => font_metrics.characters_list[index]?.char || '').join('');

    const is_overflowing = overflow_str.length >= font_metrics.characters_amount ? false : true;
    element_text.current.innerText = `${overflow_str}${!is_overflowing ? '' : default_end}`;

    if (is_enable_title && is_overflowing)
      element_text.current.title = get_attrs;

  }

  const create_observing = () => {

    observability_parent.current = new MutationObserver(() => overflow_logic());
    resize_observer.current = new ResizeObserver(() => overflow_logic());

    const settings = { childList: true, attributes: true };

    observability_parent.current.observe(element_text.current.parentElement as Node, settings);
    resize_observer.current.observe(element_text.current.parentElement as Element);

  }

  useEffect(() => {

    if (content) {

      element_text.current.setAttribute(attribute_name, content as string);
      overflow_logic();

    }

  }, [content])

  useEffect(() => {

    overflow_logic();
    create_observing();
    window.addEventListener('resize', overflow_logic);

    return () => {

      window.removeEventListener('resize', overflow_logic);
      observability_parent.current.disconnect();
      resize_observer.current.disconnect();

    }

  }, [enable_title, delimiter]);

  return children(element_text);

}