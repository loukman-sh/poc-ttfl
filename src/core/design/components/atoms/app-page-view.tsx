import { Dimensions, FlatList, FlatListProps } from "react-native";

type Props<T> = FlatListProps<T> & {};

export function AppPageView<T>(props: Props<T>) {
  return (
    <FlatList<T>
      getItemLayout={(_, index) => ({
        length: Dimensions.get("window").width,
        offset: Dimensions.get("window").width * index,
        index,
      })}
      horizontal
      bounces={false}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      {...props}
    />
  );
}
