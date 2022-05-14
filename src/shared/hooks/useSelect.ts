import { useAppDispatch, useAppSelector } from ".";
import { actions } from "../store";

export const useSelect = (id: string) => {
  const dispatch = useAppDispatch();
  const { selectedShapeId } = useAppSelector((state) => state.shape);

  const onSelect = () => dispatch(actions.select({ id }));

  return { onSelect, selected: selectedShapeId === id };
};
