"use client";

import { Button, Input, Textarea } from "@/components/ui";
import { useTutorialStore } from "@/stores/tutorial.store";
import clsx from "clsx";
import { ChangeEvent, useState } from "react";

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export default function TutorialPage() {
    const currentStep = useTutorialStore((state) => state.currentStep);

    const steps = [<WelcomeStep />, <WorkspaceTutorialName />, <WorkspaceTutorialDescription />, <WorkspaceTutorialImage />];
    return steps[currentStep];
}

function WelcomeStep() {
    const setStep = useTutorialStore((state) => state.setStep);
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold mb-2">Welcome Alfredo!</h1>
            <p className="mb-2">Let us do the hard work for you</p>
            <Button onClick={() => setStep(1)}>Create your first workspace</Button>
        </div>
    );
}
function WorkspaceTutorialName() {
    const workspace = useTutorialStore((state) => state.workspace);
    const setStep = useTutorialStore((state) => state.setStep);
    const setWorkspaceProperty = useTutorialStore(
        (state) => state.setWorkspaceProperty
    );

    return (
        <div className="grid grid-cols-2 items-center gap-8 h-screen w-4/5 mx-auto">
            <div className="flex flex-col justify-center">
                <div className="mb-4">
                    <button className="mb-6 text-sm text-gray-400 hover:text-gray-800 transition-colors" onClick={() => setStep(-1)}>Go Back</button>
                    <h2 className="text-2xl font-bold">
                        What's the name of the workspace
                    </h2>
                    <span>You can change this later, no worries!</span>
                </div>
                <Input
                    onChange={(e) => setWorkspaceProperty("name", e.target.value)}
                    value={workspace.name}
                    placeholder="Ex: Wayne Industries"
                    className="mb-4 bg-white"
                />
                <Button className="w-fit ml-auto" size={"lg"} onClick={() => setStep(1)}>Next</Button>
            </div>
            <div>
                <span className="block mb-4 text-center text-gray-500">This is how your workspace is looking!</span>
                <div className="grid grid-cols-3 items-center gap-8 shadow-sm p-8 bg-white rounded-md">
                    <div className="w-[150px] h-[150px] bg-slate-400" style={{ background: `url(https://placehold.co/150x150)` }}></div>
                    <div className="col-span-2">
                        <h2
                            className={clsx("text-2xl font-bold mb-2", {
                                "text-gray-300 font-normal":
                                    !workspace.name,
                            })}
                        >
                            {workspace.name ? workspace.name : "Ex: Wayne Industries"}
                        </h2>
                        <p className={clsx("text-sm mb-2", {
                            "text-gray-300":
                                !workspace.description,
                        })}>{workspace.description ? workspace.description : loremIpsum}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WorkspaceTutorialDescription() {
    const workspace = useTutorialStore((state) => state.workspace);
    const setStep = useTutorialStore((state) => state.setStep);
    const setWorkspaceProperty = useTutorialStore(
        (state) => state.setWorkspaceProperty
    );


    return (
        <div className="grid grid-cols-2 items-center gap-8 h-screen w-4/5 mx-auto">
            <div className="flex flex-col justify-center">
                <div className="mb-6">
                    <button className="mb-6 text-sm text-gray-400 hover:text-gray-800 transition-colors" onClick={() => setStep(-1)}>Go Back</button>
                    <h2 className="text-2xl font-bold">
                        Great! Now describe your workspace
                    </h2>
                    <span className="text-sm">Again, you can change this later :)</span>
                </div>
                <Textarea value={workspace.description} onChange={(e) => setWorkspaceProperty("description", e.target.value)} className="mb-4 bg-white"></Textarea>
                <Button className="w-fit ml-auto" size={"lg"} onClick={() => setStep(1)}>Next</Button>

            </div>
            <div>
                <span className="block mb-4 text-center text-gray-500">This is how your workspace is looking!</span>
                <div className="grid grid-cols-3 items-center gap-8 shadow-sm p-8 bg-white rounded-md">
                    <div className="w-[150px] h-[150px] bg-slate-400" style={{ background: `url(https://placehold.co/150x150)` }}></div>
                    <div className="col-span-2">
                        <h2
                            className={clsx("text-2xl font-bold mb-2", {
                                "text-gray-300 font-normal":
                                    !workspace.name,
                            })}
                        >
                            {workspace.name ? workspace.name : "Ex: Wayne Industries"}
                        </h2>
                        <p className={clsx("text-sm mb-2", {
                            "text-gray-300":
                                !workspace.description,
                        })}>{workspace.description ? workspace.description : loremIpsum}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WorkspaceTutorialImage() {
    const workspace = useTutorialStore((state) => state.workspace);
    const setStep = useTutorialStore((state) => state.setStep);
    const setWorkspaceProperty = useTutorialStore(
        (state) => state.setWorkspaceProperty
    );
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file && file.type.substr(0, 5) === 'image') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string); // Cast reader.result to string
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <div className="grid grid-cols-2 items-center gap-8 h-screen w-4/5 mx-auto">
            <div className="flex flex-col justify-center">
                <div className="mb-4">
                    <button className="mb-6 text-sm text-gray-400 hover:text-gray-800 transition-colors" onClick={() => setStep(-1)}>Go Back</button>
                    <h2 className="text-2xl font-bold">
                        Finally, upload an image!
                    </h2>
                    <span>This is optional, you can change it later</span>
                </div>
                <Input
                    type="file"
                    onChange={handleImageChange}
                />
            </div>
            <div>
                <span className="block mb-4 text-center text-gray-500">This is how your workspace is looking!</span>
                <div className="grid grid-cols-3 items-center gap-8 shadow-sm p-8 bg-white rounded-md">
                    <div className="w-[150px] h-[150px] bg-slate-400">
                        {imagePreview && (
                            <img src={imagePreview} alt="Image Preview" style={{ width: '100%', height: "100%", objectFit: "cover" }} />
                        )}
                    </div>
                    <div className="col-span-2">
                        <h2
                            className={clsx("text-2xl font-bold mb-2", {
                                "text-gray-300 font-normal":
                                    !workspace.name,
                            })}
                        >
                            {workspace.name ? workspace.name : "Ex: Wayne Industries"}
                        </h2>
                        <p className={clsx("text-sm mb-2", {
                            "text-gray-300":
                                !workspace.description,
                        })}>{workspace.description ? workspace.description : loremIpsum}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}