import { format } from 'date-fns';
import { Rating } from 'react-simple-star-rating';

import { Review } from '@/common/types';

type ReviewItemProps = {
  review: Review;
};
export const ReviewItem = ({ review }: ReviewItemProps) => {
  const { comment, createdAt, rating, user } = review;
  return (
    <div className="flex h-40 items-center gap-2 bg-white px-4 py-2">
      <div className="flex flex-col  gap-2">
        <Rating
          allowFraction
          size={16}
          initialValue={rating}
          readonly={true}
          fillColor="#00b67a"
        />
        <div className="flex gap-2">
          <h3 className="text-base font-medium">{user.name}</h3>
          <span className="text-sm text-gray-600">
            {format(new Date(createdAt), 'MMMM d, yyyy')}
          </span>
        </div>

        <p className="text-sm text-gray-600 ">{comment}</p>
      </div>
    </div>
  );
};
