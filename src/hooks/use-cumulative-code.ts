import { useTypedSelector } from "./use-typed-selector";
import { selectCellsData, selectCellsOrder } from "../redux/selectors";
import { Cell } from "../types";

export const useCumulativeCode = (cellId: Cell["id"]) => {
  const data = useTypedSelector(selectCellsData);
  const order = useTypedSelector(selectCellsOrder);

  const orderedCells = order.map((id) => data[id]);

  const showFunc = `
        import _React from 'react';
        import _ReactDom from 'react-dom';
        
        var show = (v) => {
          const root = document.querySelector("#root");
          if(typeof v === 'object') {
            if(v.$$typeof && v.props) {
              _ReactDom.render(v,root)
            } else {
              root.innerHTML = JSON.stringify(v);
            }
          } else {
            root.innerHTML = v;
          }
        }
      `;

  const showFuncNoop = "var show = () => {}";
  const cumulativeCode = [];

  for (const cell of orderedCells) {
    if (cell.type === "code") {
      if (cell.id === cellId) {
        cumulativeCode.push(showFunc);
      } else {
        cumulativeCode.push(showFuncNoop);
      }
      cumulativeCode.push(cell.content);
    }
    if (cell.id === cellId) break;
  }

  return cumulativeCode.join("\n");
};
