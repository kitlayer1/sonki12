import { component$ } from '@builder.io/qwik';
import './comment.css';

export interface CommentItem {
  text: string;
  name: string;
  title: string;
  image: string;
  bg: string;
  color: string;
}

interface CommentSectionProps {
  title?: string;
  comments: CommentItem[];
}

export default component$<CommentSectionProps>(
  ({  comments }) => {
    return (
      <section class="comment-section">
         <div class="comment-header">
        <h2>
       Loved by Entrepreneurs

          <br />
           Worldwide
        </h2>
      </div>

        <div class="comment-grid">
          {comments.map((item, index) => (
            <div
              key={index}
              class="comment-card"
              style={{ backgroundColor: item.bg, color: item.color }}
            >
              <p class="comment-text">{item.text}</p>

              <div class="comment-footer">
                <img
                  src={item.image}
                  alt={item.name}
                  class="comment-avatar"
                />
                <div>
                  <p class="comment-name">{item.name}</p>
                  <p class="comment-title">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
);