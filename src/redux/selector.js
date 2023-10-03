import { createSelector } from "@reduxjs/toolkit";

export const contactsData = state => state.contacts.items;

export const selectFilter = state => state.filter.filter;

export const selectFilteredContacts = createSelector([contactsData, selectFilter], (items, filter) => {
    return items.filter(item=>item.name.toLowerCase().includes(filter.toLowerCase()))
})