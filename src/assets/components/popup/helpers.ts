export function getISOChapters(isoControlId: string) {
  if (isoControlId == null || isoControlId.length == 0) return 0;
  const chapterStartIndex = isoControlId[0] === "A" ? 1 : 0;
  const dotIndex = isoControlId.indexOf(".");
  const chapter = Number.parseInt(
    isoControlId.substring(chapterStartIndex, dotIndex)
  );
  if (Number.isNaN(chapter)) return 0;
  const subChapter = Number.parseInt(
    isoControlId.substring(dotIndex + 1, isoControlId.indexOf(" "))
  );
  if (Number.isNaN(subChapter)) return chapter;
  const subChapterPadded = String(subChapter).padStart(3, "0");
  return Number.parseFloat(chapter + subChapterPadded);
}

export function getMitreChapter(mitreControlId: string): number {
  if (mitreControlId == null || mitreControlId.length == 0) return 0;
  const dotIndex = mitreControlId.indexOf(".");
  const findIndex = dotIndex !== -1 ? dotIndex : undefined;
  const chapter = Number.parseInt(mitreControlId.substring(1, findIndex));
  if (Number.isNaN(chapter)) return 0;
  const subChapter = Number.parseInt(
    mitreControlId.substring(dotIndex + 1, mitreControlId.indexOf(" "))
  );
  if (Number.isNaN(subChapter)) return chapter;
  const subChapterPadded = String(subChapter).padStart(3, "0");
  return Number.parseFloat(chapter + subChapterPadded);
}

export function getNistSubChapter(nistControlId: string): number {
  if (nistControlId == null || nistControlId.length == 0) return 0;
  const chapterStartIndex = 3;
  const res = Number.parseInt(nistControlId.substring(chapterStartIndex));
  if (Number.isNaN(res)) return 0;
  return res;
}
export function getMitreTechniques(isoControlId: string) {
  if (isoControlId == null || isoControlId.length == 0) return 0;
  const chapterStartIndex = isoControlId[0] === "A" ? 1 : 0;
  const dotIndex = isoControlId.indexOf(".");
  const chapter = Number.parseInt(
    isoControlId.substring(chapterStartIndex, dotIndex)
  );
  if (Number.isNaN(chapter)) return 0;
  const subChapter = Number.parseInt(
    isoControlId.substring(dotIndex + 1, isoControlId.indexOf(" "))
  );
  if (Number.isNaN(subChapter)) return chapter;
  const subChapterPadded = String(subChapter).padStart(3, "0");
  return Number.parseFloat(chapter + subChapterPadded);
}
