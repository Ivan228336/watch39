import { PostForm } from "@/components/PostForm";
import { savePostAction } from "@/app/actions/post";

export default function CreatePostPage() {
  const createAction = savePostAction.bind(null, null);

  return (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h1>Создать пост</h1>
      <PostForm action={createAction} />
    </div>
  );
}