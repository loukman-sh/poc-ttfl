import {
  SessionStatus,
  useSession,
} from "@/features/auth/presentation/hooks/use-session";
import { Redirect, Stack } from "expo-router";

export default function PublicLayout() {
  const { status } = useSession();

  if (status === SessionStatus.AUTHENTICATED) {
    return <Redirect href="/(private)/(tabs)/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
