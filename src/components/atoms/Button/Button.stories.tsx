import { action } from "@storybook/addon-actions";
import type { Story, ComponentMeta } from "@storybook/react";

import Button from ".";
import type { ButtonProps } from "./types";

export default {
  title: "Component/Atoms/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["base", "text"],
      },
    },
    children: {
      control: "text",
    },
  },
} as ComponentMeta<typeof Button>;

const Template: Story<ButtonProps> = (args) => (
  <Button onClick={action("button-click")} {...args} />
);

export const Base = Template.bind({});
Base.args = {
  variant: "base",
  children: "Click Me",
};

export const Text = Template.bind({});
Text.args = {
  variant: "text",
  children: "Click Me",
};
