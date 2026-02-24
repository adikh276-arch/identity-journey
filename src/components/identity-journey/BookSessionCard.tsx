import { Heart } from "lucide-react";

const BookSessionCard = () => {
  return (
    <div className="card-base border border-lavender-mid">
      <div className="flex gap-3">
        <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-foreground leading-relaxed">
            Want to explore your identity journey with a therapist? They're trained to help.
          </p>
          <button className="mt-3 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-xl hover:bg-lavender transition-colors">
            Book a Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSessionCard;
