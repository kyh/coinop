import { ProfileForm } from "./profile-form";

// export const runtime = "edge";

const Page = async () => {
  return (
    <section className="mt-5 max-w-md">
      <ProfileForm />
    </section>
  );
};

export default Page;
