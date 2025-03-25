import { Container } from "inversify";
import { injectAuth } from "@/features/auth/common/auth-injection";
import SupabaseServiceImpl from "../services/supabase-service";
import { SupabaseService } from "../services/supabase-service";

export const container = new Container({ defaultScope: "Singleton" });

// Core dependencies
container.bind<SupabaseService>(SupabaseService).to(SupabaseServiceImpl);

// Features dependencies
injectAuth(container);

// Services initialization
container.get(SupabaseService).init();

export default container;
