interface ArticleCardProps {
  id: string;
  preview: string;
  createdAt: string;
  author: string;
}
const sampleText = ` Step 1 - Understand the problem and establish design scope
Asking clarification questions is the first step to tackle any system design interview question.
Here is an example of candidate-interviewer interaction:
Candidate: What are the characteristics of unique IDs?
Interviewer: IDs must be unique and sortable.
Candidate: For each new record, does ID increment by 1?
Interviewer: The ID increments by time but not necessarily only increments by 1. IDs
created in the evening are larger than those created in the morning on the same day.
Candidate: Do IDs only contain numerical values?
Interviewer: Yes, that is correct.
Candidate: What is the ID length requirement?
Interviewer: IDs should fit into 64-bit.
Candidate: What is the scale of the system?
Interviewer: The system should be able to generate 10,000 IDs per second.
Above are some of the sample questions that you can ask your interviewer. It is important to
understand the requirements and clarify ambiguities. For this interview question, the
requirements are listed as follows:
• IDs must be unique.
• IDs are numerical values only.
• IDs fit into 64-bit.
• IDs are ordered by date.
• Ability to generate over 10,000 unique IDs per second.`;

const ArticleCard = ({ preview, createdAt, author }: ArticleCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col h-full">
      {/* Author & Date Info */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
            {author[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{author}</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider">
              {createdAt}
            </p>
          </div>
        </div>
      </div>

      {/* Content Preview */}
      <div className="flex-1">
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
          {sampleText}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <button className="text-slate-600 cursor-pointer hover:text-indigo-600 p-2 hover:bg-indigo-50 rounded-lg transition-colors text-sm font-medium">
            Edit
          </button>
          <button className="text-slate-600 cursor-pointer hover:text-slate-900 p-2 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium">
            Preview
          </button>
        </div>

        <button className="text-red-500 cursor-pointer hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
          Delete
        </button>
      </div>
    </div>
  );
};
export default ArticleCard;
