"use client";

import { Button, Input, Textarea } from "@/components/ui";
import { LOREM_IPSUM } from "@/consts";
import { useUpdateTutorialState } from "@/hooks/tutorial";
import { useCreateWorkspace } from "@/hooks/workspaces";
import { useUploadThing } from "@/lib/files";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useTutorialContext } from "./context";

const TUTORIAL_STEPS = [
  {
    Component: WelcomeStep,
    title: "",
    description: "",
  },
  {
    Component: TitleStep,
    title: "Let's configure your workspace",
    description: "You can change it later",
  },
  {
    Component: DescriptionStep,
    title: "Now, let's describe your workspace",
    description: "Again, you can change this later",
  },
  {
    Component: ImageStep,
    title: "Finally, let's upload an image",
    description: "",
  },
];

export function TutorialContainer({ username }: { username: string }) {
  const { currentStep } = useTutorialContext();
  const { Component, title, description } = TUTORIAL_STEPS[currentStep];

  return (
    <div
      className={cn(
        "grid items-center gap-8 h-screen w-4/5 mx-auto",
        currentStep > 0 && "lg:grid-cols-2",
      )}
    >
      <div className="flex flex-col justify-center">
        <StepWrapper title={title} description={description ?? ""}>
          <Component username={username} />
        </StepWrapper>

        <TutorialFooter />
      </div>

      {currentStep > 0 && <WorkspacePreview />}
    </div>
  );
}

// *** Steps ***

function WelcomeStep({ username }: { username: string }) {
  const { goNext } = useTutorialContext();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-2">Welcome {username}!</h1>
      <p className="mb-2">Let us do the hard work for you</p>
      <Button onClick={goNext}>Create your first workspace</Button>
    </div>
  );
}

function TitleStep() {
  const { setFormProperty, form } = useTutorialContext();

  return (
    <div>
      <Input
        onChange={(e) => setFormProperty("title", e.target.value)}
        value={form.title}
        placeholder="Ex: Wayne Industries"
        className="bg-white"
      />
    </div>
  );
}

function DescriptionStep() {
  const { setFormProperty, form } = useTutorialContext();

  return (
    <div>
      <Textarea
        value={form.description}
        onChange={(e) => setFormProperty("description", e.target.value)}
        className="mb-4 bg-white"
      />
    </div>
  );
}

function ImageStep() {
  const { setFormProperty } = useTutorialContext();

  return (
    <Input
      type="file"
      onChange={(e) => setFormProperty("thumbnail", e.currentTarget.files?.[0])}
      accept="img"
    />
  );
}

function StepWrapper({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const { currentStep, goBack } = useTutorialContext();

  return (
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
      <span className="block mb-2">{description}</span>

      {children}
    </div>
  );
}

function WorkspacePreview() {
  const { form } = useTutorialContext();
  let imageUrl = "https://placehold.co/150x150";

  if (form.thumbnail) {
    imageUrl = URL.createObjectURL(form.thumbnail || new Blob());
  }

  return (
    <div>
      <span className="block mb-4 text-center text-gray-500">
        This is how your workspace is looking!
      </span>
      <div className="grid xl:grid-cols-3 items-center gap-8 shadow-sm p-8 bg-white rounded-md">
        <div
          className="w-[150px] h-[150px] bg-slate-400"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="lg:col-span-2">
          <h2
            className={clsx("text-2xl font-bold mb-2", {
              "text-gray-300 font-normal": !form.title,
            })}
          >
            {form.title || "Ex: Wayne Industries"}
          </h2>
          <p
            className={clsx("text-sm mb-2", {
              "text-gray-300": !form.description,
            })}
          >
            {form.description || LOREM_IPSUM}
          </p>
        </div>
      </div>
    </div>
  );
}

function TutorialFooter() {
  const { form, currentStep, goNext } = useTutorialContext();

  const router = useRouter();
  const { startUpload, isUploading } = useUploadThing("imageUploader");
  const { mutateAsync, isPending } = useCreateWorkspace();
  const updateTutorialState = useUpdateTutorialState();

  async function handleFinish() {
    const { thumbnail, ...rest } = form;
    let thumbnailUrl = "";

    if (thumbnail) {
      const extension = thumbnail.name.split(".").pop();
      const newFile = new File([thumbnail], nanoid() + "." + extension);
      const [uploadedFile] = (await startUpload([newFile])) || [];
      thumbnailUrl = uploadedFile.url;
    }

    await mutateAsync({ ...rest, thumbnail: thumbnailUrl });
    updateTutorialState.mutate();

    alert("Workspace created!");
    router.push("/dashboard/workspaces");
  }

  const isLoading = isUploading || isPending;

  return currentStep === TUTORIAL_STEPS.length - 1 ? (
    <Button className="w-fit" onClick={handleFinish} disabled={isLoading}>
      {isLoading ? "Creating..." : "Finish"}
    </Button>
  ) : (
    <Button className={"w-fit ml-auto"} size={"lg"} onClick={() => goNext()}>
      Next
    </Button>
  );
}
