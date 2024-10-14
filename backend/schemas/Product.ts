import { text, relationship, select, integer } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const Product = list({
  // access
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    status: select({
      // Dropdown menu for status field in the Product list in the Keystone Admin UI
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Available", value: "AVAILABLE" },
        { label: "Unavailable", value: "UNAVAILABLE" },
      ],
      defaultValue: "DRAFT",
      ui: {
        // UI configuration for the status field in the Product list in the Keystone Admin UI
        displayMode: "segmented-control", // Display the status field as a segmented control in the Keystone Admin UI
        createView: { fieldMode: "hidden" }, // Hide the status field in the create view in the Keystone Admin UI
      },
    }),
    price: integer({
      // Price field in the Product list in the Keystone Admin UI (integer type)
      isRequired: true,
    }),
    photo: relationship({
      ref: "ProductImage.product",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
      },
    }),
  },
});
