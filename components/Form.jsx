import Link from "next/link";

const Form = ({ type, setPost, post, submitting, handleSubmit }) => {
  return (
    <section>
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <form
      onSubmit={handleSubmit}
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-gray-700 text-base">
            Your ai Prompt
          </span>

          <textarea
            required
            placeholder="Write your prompt here"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            className="form_textarea"
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-gray-700 text-base">
            Tag{" "}
            <span className="font-normal">
              {" "}
              (#product, #web development, #photoGraphy , #writing)
            </span>
          </span>
          <input
            type="text"
            required
            placeholder="Tags"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            className="form_input"
          />{" "}
        </label>
        <div className=" flex flex-end gap-5 mx-3 my-7">
          <Link className="text-gray-600 text-sm" href='/'>Cancle</Link>

          <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2 text-sm bg-primary-orange rounded-lg text-white"
          >{type} Post</button>
        </div>
      </form>
    </section>
  );
};

export default Form;
