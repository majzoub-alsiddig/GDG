"use client";
import RenderFAQ from "./components/RenderFAQ";
import Header from "./components/Header";

const faqData = [
	{
		question: "What is GDG UofK?",
		answer: "Google Developer Group University of Khartoum is a community of developers, designers, and tech enthusiasts who learn, share, and build together.",
	},
	{
		question: "How can I join GDG UofK?",
		answer: "You can join by attending our events, following our social media channels, and registering through our official website.",
	},
	{
		question: "Are GDG events free?",
		answer: "Yes, all GDG events are free and open to anyone interested in technology.",
	},
	{
		question: "Do I need to be a student to join?",
		answer: "No, GDG is open to everyone regardless of background or profession.",
	},
	{
		question: "What kind of activities does GDG organize?",
		answer: "We organize workshops, hackathons, study jams, speaker sessions, and networking events focused on Google technologies and beyond.",
	},
];

const FAQ = () => {
	return (
		<div className="flex min-h-screen flex-col gap-3 items-center justify-center font-poppins">
			<Header />
			<div className="w-full gap-3">
				<RenderFAQ faqData={faqData} />
			</div>
		</div>
	);
};

export default FAQ;
