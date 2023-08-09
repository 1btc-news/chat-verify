import { IconButton } from "@chakra-ui/react";
import { FaQuestion } from "react-icons/fa";

function LearnMore(props: { href: string }) {
  return (
    <IconButton
      ml={[0, 4]}
      aria-label="View related docs"
      title="View related docs"
      icon={<FaQuestion />}
      size="sm"
      as="a"
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
    />
  );
}

export default LearnMore;
