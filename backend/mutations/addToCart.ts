import { KeystoneContext } from "@keystone-next/types";
import { CartItemCreateInput } from "../.keystone/schema-types";
import { Session } from "../types";

async function addToCart(
  root: any, // unused variable - we don't need it here but it's required by the resolver signature in Keystone 5 (it's not required in Keystone 6)
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // 1. Query the current user and see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error("You must be logged in to do this!");
  }
  // 2. Query the current user's cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: "id,quantity",
  });
  const [existingCartItem] = allCartItems;
  // 3. See if the current item is in their cart
  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1!`
    );
    // 4. if it is, increment by 1
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
      resolveFields: false,
    });
  }
  // 5. if it isn't, create a new cart item!
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
      quantity: 1,
    },
    resolveFields: false,
  });
}

export default addToCart;
