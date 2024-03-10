import { Button, Input, Label, Textarea } from "@/components/ui";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

type FormState = {
  title: string;
  description: string;
  image: File | undefined;
};

type WorkspaceFormProps = {
  isLoading: boolean;
  onSubmit: (data: FormState) => Promise<void>;
};

export default function WorkspaceForm({
  onSubmit,
  isLoading,
}: WorkspaceFormProps) {
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    image: undefined,
  });

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const image = e.target.files?.item(0);
    if (image) {
      setForm((prevFormData) => ({ ...prevFormData, image }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(form);
    await onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title:</Label>
        <Input
          required
          min={3}
          type="text"
          id="title"
          name="title"
          value={form.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description:</Label>
        <Textarea
          required
          id="description"
          name="description"
          value={form.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image:</Label>
        <Input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <Button type="submit" className="w-40" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : "Create"}
      </Button>
    </form>
  );
}
