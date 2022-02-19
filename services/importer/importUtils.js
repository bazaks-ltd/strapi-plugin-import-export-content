const importToCollectionType = async (uid, item) => {
  try {

    const { id } = item;
    let existing = false;
    if (id) {
      existing = await strapi.query(uid).count({id});
    }


    if (existing === 0) {
      await strapi.entityService.create({ data: item }, { model: uid });
    } else {
      await strapi.query(uid).update({id}, item);
    }

    return true;
  } catch (error) {
    return false;
  }
};

const importToSingleType = async (uid, item) => {
  try {
    const existing = await strapi.query(uid).find({});
    if (existing.length > 0) {
      const { id } = existing[0];
      delete item.created_by;
      await strapi.query(uid).update({ id }, item);
    } else {
      strapi.query(uid).create(item);
    }
    return [true];
  } catch (error) {
    return [false];
  }
};

module.exports = {
  importToCollectionType,
  importToSingleType,
};
