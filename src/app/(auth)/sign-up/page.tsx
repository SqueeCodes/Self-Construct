import { redirect } from "next/navigation";

import { auth } from "../../../auth";
import { SignInCard } from "../../../features/auth/components/sign-in-card";
import { SignUpCard } from "../../../features/auth/components/sign-up-card copy";

const SignInPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <SignUpCard />
};

export default SignInPage;