import Prompt from "@models/prompt";
import { connectToDataBase } from "@utils/database";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connectToDataBase();
    const prompt = await Prompt.findById(id).populate("creator");
    if (!prompt) {
      return new Response(JSON.stringify("prompt not found"), { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};

export const DELETE = async (request,{ params }) => {
  console.log(params)
  const { id } = params;
  try {
    await connectToDataBase();

    await Prompt.findByIdAndDelete(id);
    return new Response(JSON.stringify("prompt deleted"), { status: 200 });
  } catch (err) {
    return new Res();
  }
};
export const PATCH = async (request, { params }) => {
  const { id } = params;
  const { prompt, tag } = await request.json();
  try {
    await connectToDataBase();

    const oldPrompt = await Prompt.findById(id);
    if (!oldPrompt) {
      return new Response(JSON.stringify("prompt not found"), { status: 404 });
    }
    oldPrompt.prompt = prompt;
    oldPrompt.tag = tag;
    await oldPrompt.save();
    return new Response(JSON.stringify(oldPrompt), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
