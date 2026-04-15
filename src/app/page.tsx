import { redirect } from "next/navigation";

// Root page redirects to locale-based routing
// The middleware handles / -> /en internally with localePrefix: 'as-needed'
export default function RootPage() {
  redirect("/en");
}
