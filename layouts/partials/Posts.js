import Image from 'next/image'; // Ensure you have this import if you're using Next.js's Image component

const Posts = ({ posts, authors }) => {
  return (
    <div className="posts">
      {posts.map((post, i) => (
        <div key={i} className={i === 0 ? "col-12" : "col-12 sm:col-6"}>
          {post.frontmatter?.image && (
            <Image
              className="rounded-lg"
              src={post.frontmatter.image}
              alt={post.frontmatter.title || 'Image'}
              width={500} // You may need to adjust the width and height based on your design
              height={300}
            />
          )}
          {/* Render other post details */}
        </div>
      ))}
    </div>
  );
};

export default Posts;
