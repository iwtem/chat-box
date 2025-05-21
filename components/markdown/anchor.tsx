import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

const Anchor = (
  props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
) => {
  const href = props.href || '';

  if (/\.(aac|mp3|opus|wav)$/.test(href)) {
    return (
      <figure>
        <audio controls src={href}></audio>
      </figure>
    );
  }

  if (/\.(3gp|3g2|webm|ogv|mpeg|mp4|avi)$/.test(href)) {
    return (
      <video controls width="99.9%">
        <source src={href} />
      </video>
    );
  }

  const isInternal = /^\/#/i.test(href);
  const target = isInternal ? '_self' : (props.target ?? '_blank');
  return <a {...props} target={target} />;
};

export default Anchor;
