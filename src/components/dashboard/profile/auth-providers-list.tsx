import { Button } from "@/components/ui";
import { AUTH_PROVIDERS, AuthProvider } from "@/constants/auth";
import { cn } from "@/lib/utils";

type AuthProvidersListProps = {
  userLinkedProviders: string[];
};

export function AuthProvidersList({
  userLinkedProviders,
}: AuthProvidersListProps) {
  return (
    <section className="flex flex-col gap-2">
      <header>
        <h3 className="font-semibold text-center">Linked accounts</h3>
      </header>

      <ul className="flex justify-center gap-4">
        {Object.keys(AUTH_PROVIDERS).map((provider) => {
          // Iterates over the all the available providers and checks if the user has linked them
          const isLinked = userLinkedProviders.includes(provider);
          const { styles, Icon } = AUTH_PROVIDERS[provider as AuthProvider];

          return (
            <li key={provider}>
              <Button
                asChild
                disabled={!isLinked}
                size="icon"
                className={cn(
                  "p-2 pointer-events-none",
                  styles.backgroundColor,
                  !isLinked && "opacity-45",
                )}
              >
                <Icon />
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
