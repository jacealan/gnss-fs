export const EnterHtmlParser = ({ text }: { text: string }) => {
  const textList = text.split("\n");

  return (
    <>
      {textList[0]}
      {textList.length > 1 &&
        textList.map((line, index) => {
          if (index === 0) {
            return;
          } else {
            return (
              <>
                <br />
                {line}
              </>
            );
          }
        })}
    </>
  );
};
