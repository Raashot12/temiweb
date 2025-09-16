import { Pill } from "@/types/index";

export const validateTest = (
    testName: string,
    specificOrganismName: string
  ): string => {
    if (testName?.startsWith('[Specific organism]')) {
      const cleanTestName = testName.replace('[Specific organism]', '').trim();
      return `${specificOrganismName} ${cleanTestName}`;
    }
    return testName;
  };

  export const validateSpecificOrganism = (entries: Pill[]) => {
    const errors: Array<string> = [];
  
    entries.forEach((item) => {
      if (
        item?.value?.startsWith('[Specific organism]') &&
        !item.specificOrganism
      ) {
        errors.push(
          `Missing specific organism for ${item.value} under ${item.tab}`
        );
      }
    });
  
    return errors.length > 0 ? errors : 'All entries are valid.';
  };

  export const RefactoredActivePills = (newData: Pill[]) => {
    const tabsOfInterest = [
      'Haematology',
      'Chemistry',
      'Microbiology',
      'Serology',
      'Radiology + Pulm',
      'Electrophysiology',
      'Histopathology',
    ];
  
    // Handle specimens
    const specimensByTab = newData.filter(
      (item) =>
        tabsOfInterest.includes(item?.tab as string) && item.sub === 'specimen'
    );
  
    // Handle specific organisms
    const specificOrganismsByTab = newData.filter(
      (item) =>
        tabsOfInterest.includes(item?.tab as string) &&
        item.sub === 'specific organism'
    );
  
    // Handle body parts
    const bodyPartsByTab = newData.filter(
      (item) =>
        tabsOfInterest.includes(item?.tab as string) && item.sub === 'body parts'
    );
  
    // Handle views
    const viewsByTab = newData
      .filter(
        (item) =>
          tabsOfInterest.includes(item?.tab as string) && item.sub === 'views'
      )
      .reduce<{ [key: string]: string[] }>((acc, current) => {
        const key = `${current?.tab ?? ''}`;
        return {
          ...acc,
          [key]: acc[key] ? [...acc[key], current.value] : [current.value],
        };
      }, {});
  
    const updatedData = newData.map((item) => {
      if (tabsOfInterest.includes(item?.tab as string)) {
        if (item.sub === 'test') {
          const specimenForTab = specimensByTab.find(
            (specimen) => specimen.tab === item.tab
          );
          const specificOrganismForTab = specificOrganismsByTab.find(
            (organism) => organism.tab === item.tab
          );
          const bodyPartForTab = bodyPartsByTab.find(
            (organism) => organism.tab === item.tab
          );
          const viewsForTab = viewsByTab[item?.tab as string]?.join(', ');
  
          return {
            ...item,
            specimen: specimenForTab ? specimenForTab.value : item.specimen,
            specificOrganism: specificOrganismForTab
              ? specificOrganismForTab.value
              : item.specificOrganism,
            bodyPart: bodyPartForTab ? bodyPartForTab.value : item.bodyPart,
            views: viewsForTab || item.views,
          };
        }
      }
      return item;
    });
  
    const finalData = updatedData.filter(
      (item) =>
        item.sub !== 'specimen' &&
        item.sub !== 'specific organism' &&
        item.sub !== 'body parts' &&
        item.sub !== 'views'
    );
  
    return finalData;
  };