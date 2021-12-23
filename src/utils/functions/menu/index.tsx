import { IinitialMenu } from 'shared/context/menu.recoil';
import { produce } from 'immer';

type ejectMenuDataType = 'location' | 'breadcrumb';

export function ejectNowMenuData(
  menu: IinitialMenu[],
  type: ejectMenuDataType,
  nowlocation: string
): IinitialMenu[] | IinitialMenu {
  const ejectBreadCrumbData: IinitialMenu[] = [];
  let ejectLocationData: IinitialMenu = null;

  menu.forEach((firstDeps: IinitialMenu) => {
    if (firstDeps.path) {
      if (firstDeps.path === nowlocation) {
        if (type === 'breadcrumb') {
          ejectBreadCrumbData.push(firstDeps);
        } else {
          ejectLocationData = firstDeps;
        }
      }
    } else {
      firstDeps.views.forEach((secondDeps) => {
        if (secondDeps.path) {
          if (secondDeps.path === nowlocation) {
            if (type === 'breadcrumb') {
              ejectBreadCrumbData.push(firstDeps, secondDeps);
            } else {
              ejectLocationData = secondDeps;
            }
          }
        } else {
          secondDeps.views.forEach((thirdDeps) => {
            if (thirdDeps.path === nowlocation) {
              if (type === 'breadcrumb') {
                ejectBreadCrumbData.push(firstDeps, secondDeps, thirdDeps);
              } else {
                ejectLocationData = thirdDeps;
              }
            }
          });
        }
      });
    }
  });

  return type === 'breadcrumb' ? ejectBreadCrumbData : ejectLocationData;
}

export function menuChange(isLink: boolean, selectObj: IinitialMenu) {
  return (prevMenu: IinitialMenu[]): IinitialMenu[] => {
    if (isLink) {
      const nextMenu = produce(prevMenu, (draft) => {
        draft.map((deps1) => {
          const firstDeps = deps1;
          firstDeps.active = firstDeps.name_code === selectObj.name_code;
          if (firstDeps.views) {
            firstDeps.views.forEach((deps2) => {
              const secondDeps = deps2;
              if (secondDeps.name_code === selectObj.name_code) {
                firstDeps.active = true;
                secondDeps.active = true;
              } else {
                secondDeps.active = false;
              }
              if (secondDeps.views) {
                secondDeps.views.forEach((deps3) => {
                  const thirdDeps = deps3;
                  if (thirdDeps.name_code === selectObj.name_code) {
                    firstDeps.active = true;
                    secondDeps.active = true;
                    thirdDeps.active = true;
                  } else {
                    thirdDeps.active = false;
                  }
                });
              }
            });
          }
        });
      });
      return nextMenu as [];
    }
    return prevMenu;
  };
}
