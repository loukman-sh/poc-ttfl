import {
  useSession,
  SessionStatus,
} from "@/features/auth/presentation/hooks/use-session";
import { Redirect, Stack } from "expo-router";

export default function PrivateLayout() {
  const { status } = useSession();

  if (status === SessionStatus.UNAUTHENTICATED) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
