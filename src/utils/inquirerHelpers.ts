import inquirer from "inquirer";

interface InquirerAnswers {
  from: number;
  to: number;
  segment: string;
}

export async function askMissingOptions(
  current: Partial<InquirerAnswers>
): Promise<InquirerAnswers> {
  const answers = await inquirer.prompt([
    {
      type: "number",
      name: "from",
      message: "Posição inicial:",
      when: () => current.from === undefined,
    },
    {
      type: "number",
      name: "to",
      message: "Posição final:",
      when: () => current.to === undefined,
    },
    {
      type: "input",
      name: "segment",
      message: "Segmento (ex: P, Q, R):",
      when: () => current.segment === undefined,
    },
  ]);

  return {
    from: current.from ?? answers.from,
    to: current.to ?? answers.to,
    segment: current.segment ?? answers.segment,
  };
}
