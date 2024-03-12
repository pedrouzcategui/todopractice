"use client";

import { ImageUploader } from "@/components/ImageUploader";
import { Button, Input, Textarea } from "@/components/ui";
import { LOREM_IPSUM } from "@/consts";
import { useCreateWorkspace } from "@/hooks/workspaces";
import { api } from "@/lib/api";
import { useUploadThing } from "@/lib/files";
import { cn } from "@/lib/utils";
import { useTutorialStore } from "@/stores/tutorial.store";
import clsx from "clsx";
import { LogOut } from "lucide-react";
import { nanoid } from "nanoid";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type WorkspaceConfigurationStepProps = {
  title: string;
  subtitle?: string;
};

const TUTORIAL_STEPS: WorkspaceConfigurationStepProps[] = [
  {
    title: "Let's configure your workspace",
    subtitle: "You can change it later",
  },
  {
    title: "Now, let's describe your workspace",
    subtitle: "Again, you can change this later",
  },
  {
    title: "Finally, let's upload an image",
  },
];

export default function TutorialPage() {
  const [didStartConfiguration, setDidStartConfiguration] =
    useState<boolean>(false);
  if (!didStartConfiguration) {
    return (
      <>
        <SignOutButton />
        <WelcomeStep setStart={setDidStartConfiguration} />;
      </>
    );
  }

  return (
    <>
      <SignOutButton />
      <TutorialContainer />
    </>
  );
}

function SignOutButton() {
  function handleSignOut() {
    signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <Button
      variant="ghost"
      className="fixed top-6 left-6 text-destructive hover:bg-destructive/25 hover:text-destructive"
      onClick={handleSignOut}
    >
      <LogOut size={16} className="mr-3" />
      Sign out
    </Button>
  );
}

function WelcomeStep({ setStart }: { setStart: (b: boolean) => void }) {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-2">Welcome Alfredo!</h1>
      <p className="mb-2">Let us do the hard work for you</p>
      <Button onClick={() => setStart(true)}>
        Create your first workspace
      </Button>
    </div>
  );
}

function TutorialContainer() {
  const currentStep = useTutorialStore((state) => state.currentStep);

  return (
    <div className="grid lg:grid-cols-2 items-center gap-8 h-screen w-4/5 mx-auto">
      <WorkspaceConfigurationSection {...TUTORIAL_STEPS[currentStep]} />
      <WorkspacePreview />
    </div>
  );
}

function WorkspaceConfigurationSection({
  title,
  subtitle,
}: WorkspaceConfigurationStepProps) {
  const goNext = useTutorialStore((state) => state.goNext);
  const goBack = useTutorialStore((state) => state.goBack);
  const workspace = useTutorialStore((state) => state.workspace);
  const currentStep = useTutorialStore((state) => state.currentStep);
  const setWorkspaceProperty = useTutorialStore(
    (state) => state.setWorkspaceProperty,
  );

  const router = useRouter();
  const { mutateAsync, isPending: isUploadingFormData } = useCreateWorkspace();
  const { startUpload, isUploading: isUploadingImage } =
    useUploadThing("imageUploader");

  async function handleSubmit(data: {
    title: string;
    description: string;
    image?: File;
  }) {
    let thumbnail = "";

    // TODO: delete image on error
    if (data.image) {
      const extension = data.image.name.split(".").pop();
      const newFile = new File([data.image], nanoid() + "." + extension);
      const [{ url }] = (await startUpload([newFile])) as { url: string }[];
      thumbnail = url;
    }

    await mutateAsync({
      description: data.description,
      title: data.title,
      thumbnail,
    });
    await api.get("/revalidate?path=/dashboard/workspaces");
    router.refresh();
    alert("Workspace created!");
    router.push("/dashboard/workspaces");
  }

  const isLoading = isUploadingFormData || isUploadingImage;

  const SECTIONS_INPUTS = [
    <Input
      key={0}
      onChange={(e) => setWorkspaceProperty("name", e.target.value)}
      value={workspace.name}
      placeholder="Ex: Wayne Industries"
      className="bg-white"
    />,
    <Textarea
      key={1}
      value={workspace.description}
      onChange={(e) => setWorkspaceProperty("description", e.target.value)}
      className="mb-4 bg-white"
    ></Textarea>,
    <ImageUploader key={2} />,
  ];

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-4">
        <Button
          variant={"ghost"}
          className={cn(
            "px-0 mb-6 text-sm text-gray-400 hover:text-gray-800 transition-colors",
            { hidden: currentStep === 0 },
          )}
          onClick={() => goBack()}
        >
          Go Back
        </Button>
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className="block mb-2">{subtitle}</span>
        {SECTIONS_INPUTS[currentStep]}
      </div>
      {currentStep === SECTIONS_INPUTS.length - 1 ? (
        <Button
          className="w-fit"
          onClick={() =>
            handleSubmit({
              title: workspace.name,
              description: workspace.description,
              image: workspace.image,
            })
          }
          disabled={isLoading}
        >
          Finish
        </Button>
      ) : (
        <Button
          className={"w-fit ml-auto"}
          size={"lg"}
          onClick={() => goNext()}
        >
          Next
        </Button>
      )}
    </div>
  );
}

function WorkspacePreview() {
  const workspace = useTutorialStore((state) => state.workspace);
  const imageUrl = URL.createObjectURL(workspace.image || new Blob());

  return (
    <div>
      <span className="block mb-4 text-center text-gray-500">
        This is how your workspace is looking!
      </span>
      <div className="grid xl:grid-cols-3 items-center gap-8 shadow-sm p-8 bg-white rounded-md">
        <div
          className="w-[150px] h-[150px] bg-slate-400"
          style={{
            backgroundImage: `url(${
              workspace.image ? imageUrl : "https://placehold.co/150x150"
            })`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="lg:col-span-2">
          <h2
            className={clsx("text-2xl font-bold mb-2", {
              "text-gray-300 font-normal": !workspace.name,
            })}
          >
            {workspace.name || "Ex: Wayne Industries"}
          </h2>
          <p
            className={clsx("text-sm mb-2", {
              "text-gray-300": !workspace.description,
            })}
          >
            {workspace.description || LOREM_IPSUM}
          </p>
        </div>
      </div>
    </div>
  );
}
