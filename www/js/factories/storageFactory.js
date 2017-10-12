angular.module('LaundryWaves')
    .factory('StorageFactory', function ($localStorage) {
            $localStorage = $localStorage.$default({
                selectedCategory: {},
                selectedOrder: {},
                order: {},
                categories: [],
                catalog: [],
                tabIndex: 1,
                userId: undefined,
                apartments: [],
                areas: [],
                rewardPoints: 1600,
                redeemOption: false,
                sessionActive: false,
                authToken: ''
            });

            return {
                reset: function () {
                    $localStorage.$reset();
                    $localStorage.userId = undefined;
                    $localStorage.apartments = [];
                    $localStorage.areas = [];
                    $localStorage.tabIndex = 1;
                    $localStorage.selectedCategory = {};
                    $localStorage.selectedOrder = {};
                    $localStorage.order = {};
                    $localStorage.categories = [];
                    $localStorage.catalog = [];
                    $localStorage.rewardPoints = 1600;
                    $localStorage.redeemOption = false;
                    $localStorage.sessionActive = false;
                    $localStorage.itemTypes = [];
                    authToken:'';
                },

                //catalog Tab
                setItemTypeTabIndex: function (tabIndex) {
                    $localStorage.tabIndex = tabIndex;
                },
                getItemTypeTabIndex: function () {
                    return $localStorage.tabIndex
                },

                //Categories
                setCategories: function (categories) {
                    $localStorage.categories = categories;
                },
                getAllCategories: function () {
                    return $localStorage.categories;
                },
                setSelectedCategory: function (category) {
                    $localStorage.selectedCategory = category;
                },
                getSelectedCategory: function () {
                    return $localStorage.selectedCategory;
                },

                //catalog
                syncCatalog: function (catalog) {
                    _.each(catalog, function (item) {
                        var localItem = _.find($localStorage.catalog, {item_id: item.item_id});
                        var cachedQty = localItem ? localItem.qty : 0;
                        if (localItem) {
                            //perform edits
                            var localAddons = angular.copy(localItem.item_addons);

                            for (var propX in item) {
                                if (item.hasOwnProperty(propX)) {
                                    localItem[propX] = item[propX]
                                }
                            }
                            localItem.qty = cachedQty;
                            _.each(localItem.item_addons, function (addon) {
                                var existingAddon = _.find(localAddons, {id: addon.id});
                                addon.qty = existingAddon ? existingAddon.qty : 0;
                            });
                        } else {
                            //perform add
                            var newLocalItem = {};
                            for (var propY in item) {
                                if (item.hasOwnProperty(propY)) {
                                    newLocalItem[propY] = item[propY]
                                }
                            }
                            newLocalItem.qty = cachedQty;
                            _.each(newLocalItem.item_addons, function (addon) {
                                addon.qty = 0;
                            });
                            $localStorage.catalog.push(newLocalItem);
                        }
                    });
                },
                getCatalog: function () {
                    return $localStorage.catalog;
                },
                getCatalogByItemTypeAndServiceIds: function (itemTypeId, categoryId) {
                    return _.filter($localStorage.catalog, function (item) {
                        return item.item_itype_id == itemTypeId && item.item_service_id == categoryId;
                    });
                },
                getCatalogUnderCategoryFilteredByQuantity: function (categoryId) {
                    return _.filter($localStorage.catalog, function (item) {
                        return item.item_service_id == categoryId && item.qty > 0;
                    });
                },
                getSelectedItems: function () {
                    return _.filter($localStorage.catalog, function (item) {
                        return item.qty > 0;
                    });
                },

                //Order
                getOrderTotal: function () {
                    return _.reduce($localStorage.catalog, function (sum, item) {
                        return sum + (item.qty * item.item_cost) + _.reduce(item.item_addons, function (childSum, addon) {
                                return childSum + (addon.qty * addon.cost)
                            }, 0);
                    }, 0);
                },
                placeOrder: function (order, message) {
                    $localStorage.order = order;
                    $localStorage.order.catalog = this.getSelectedItems();
                    $localStorage.order.message = message;

                    //reset catalog items
                    $localStorage.catalog = [];
                },
                getPlacedOrder: function () {
                    return $localStorage.order;
                },
                setSelectedOrder: function (order) {
                    $localStorage.selectedOrder = order;
                },
                getSelectedOrder: function () {
                    return $localStorage.selectedOrder;
                },

                //SESSION
                getSession: function () {
                    return $localStorage.sessionActive;
                },
                setSession: function (flag) {
                    $localStorage.sessionActive = flag;
                },

                //USER
                setUserId: function (userId) {
                    $localStorage.userId = userId;
                },
                getUserId: function () {
                    return $localStorage.userId;
                },

                //Apartments
                setApartments: function (apartments) {
                    $localStorage.apartments = apartments;
                },
                getApartments: function () {
                    return $localStorage.apartments;
                },
                //Areas
                setAreas: function (areas) {
                    $localStorage.areas = areas;
                },
                getAreas: function () {
                    return $localStorage.apartments;
                },
                setAuthToken: function (token) {
                    $localStorage.authToken = token;
                },

                getAuthToken: function () {
                    return $localStorage.authToken;
                },

                getItemTypes: function () {
                    return $localStorage.itemTypes;
                },

                setItemTypes: function (itemTypes) {
                    $localStorage.itemTypes = itemTypes;
                }
            };
        }
    );
