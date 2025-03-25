import { View } from "react-native";
import { AppSpacing } from "../../theme/app-spacing";

type Props = {
  spacing?: AppSpacing;
  direction?: "vertical" | "horizontal";
};

export const AppGap = ({
  spacing = AppSpacing.medium,
  direction = "vertical",
}: Props) => {
  return (
    <View
      style={{ [direction === "vertical" ? "height" : "width"]: spacing }}
    />
  );
};
