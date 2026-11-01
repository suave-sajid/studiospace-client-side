
import { Star } from "lucide-react";

export default function StudioReviews({ reviews = [] }) {
  if (!reviews.length) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <p className="mt-3 text-sm text-muted">
          No reviews yet. Be the first to share your experience.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Reviews ({reviews.length})
        </h2>
        <p className="mt-1 text-sm text-muted">
          Experiences shared by customers.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <article
            key={review._id}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">
                  Customer
                </p>
                <p className="text-xs text-muted">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    size={15}
                    className={
                      value <= review.rating
                        ? "fill-brand text-brand"
                        : "text-muted"
                    }
                  />
                ))}
              </div>
            </div>

            <p className="text-sm leading-7 text-muted">
              {review.comment}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
