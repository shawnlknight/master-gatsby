import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// Build a custom sidebar
export default function Sidebar() {
  return S.list().title(`Slick's Slices`).items([
    // Create a new sub item
    S.listItem()
      .title('Home Page')
      .icon(() => <strong>🥃</strong>)
      .child(
        S.editor()
          .schemaType('storeSettings')
          // Make a new documentId so we do not have a
          // random string of numbers
          .documentId('downtown')
      ),
      // Add in the rest of our document items
      ...S.documentTypeListItems().filter(item => item.getId() !== 'storeSettings'),
  ])
}