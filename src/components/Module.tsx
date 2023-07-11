import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import { useStore } from "../store";

interface ModuleProps {
	title: string;
	lessonsAmount: number;
	moduleIndex: number;
}

export function Module({ title, lessonsAmount, moduleIndex }: ModuleProps) {
	const { play, currentLessonIndex, currentModuleIndex, lessons } = useStore(
		(state) => {
			const currentLessonIndex = state.currentLessonIndex;
			const currentModuleIndex = state.currentModuleIndex;
			const play = state.play;
			const lessons = state.course?.modules[currentModuleIndex].lessons;

			return { currentLessonIndex, currentModuleIndex, lessons, play };
		}
	);

	return (
		<Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
			<Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4 hover:bg-zinc-900 transition-colors">
				<span className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-sm">
					{moduleIndex + 1}
				</span>
				<div className="flex flex-col gap-1 text-left">
					<strong className="text-sm">{title}</strong>
					<span className="text-sm text-zinc-400">{lessonsAmount} aulas</span>
				</div>
				<ChevronDown
					className="w-4 h-4 ml-auto text-zinc-400 group-data-[state=open]:rotate-180
				transition-transform"
				/>
			</Collapsible.Trigger>

			<Collapsible.Content>
				<nav className="relative flex flex-col gap-4 p-6">
					{lessons &&
						lessons.map((lesson, lessonIndex) => {
							const isCurrent =
								currentModuleIndex === moduleIndex &&
								currentLessonIndex === lessonIndex;

							return (
								<Lesson
									key={lesson.id}
									title={lesson.title}
									duration={lesson.duration}
									isCurrent={isCurrent}
									// @ts-ignore
									onPlay={() => play([moduleIndex, lessonIndex])}
								/>
							);
						})}
				</nav>
			</Collapsible.Content>
		</Collapsible.Root>
	);
}
