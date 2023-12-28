const ITEM_NAME_MAX: number = 100;
const ITEM_PRICE_MAX: number = 9999;

const validateItem = async (
  itemName: string,
  itemPrice: number
): Promise<string | null> => {
  if (itemName.length > ITEM_NAME_MAX) return "Item Name Too Big";

  if (itemPrice > ITEM_PRICE_MAX) return "Item Price Too Big";

  return null;
};

export default validateItem;
