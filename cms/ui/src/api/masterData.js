const MasterData = {
    activityGroups: [
        {
            id: 1,
            title: 'فروش کالا',
        },
        {
            id: 2,
            title: 'اراپه خدمات',
        },
    ],
    superCategory: [
        {
            id: 1,
            title: 'املاک',
            activityGroupId: 1
        },
        {
            id: 2,
            title: 'وسایل نقلیه',
            activityGroupId: 1
        },
        {
            id: 3,
            title: 'کالای دیجیتال',
            activityGroupId: 1
        },
        {
            id: 4,
            title: 'خانه و آشپزخانه',
            activityGroupId: 1
        },
        {
            id: 6,
            title: 'وسایل شخصی',
            activityGroupId: 1
        },
        {
            id: 7,
            title: 'سرگرمی و فراغت',
            activityGroupId: 1
        },
        {
            id: 8,
            title: 'اجتماعی',
            activityGroupId: 1
        },
        {
            id: 9,
            title: 'تجهیزات و صنعتی',
            activityGroupId: 1
        },
    ],
    category : [
        {
            id:1,
            title:'فروش مسکونی',
            superCategoryId : 1
        },
        {
            id:2,
            title:'اجاره مسکونی',
            superCategoryId : 1
        },
        {
            id:3,
            title:'فروش اداری و تجاری',
            superCategoryId : 1
        },
        {
            id:4,
            title:'اجاره اداری و تجاری',
            superCategoryId : 1
        },
        {
            id:5,
            title:'اجاره کوتاه مدت',
            superCategoryId : 1
        },
        {
            id:6,
            title:'پروژه‌های ساخت و ساز',
            superCategoryId : 1
        },
        {
            id:7,
            title:'خودرو',
            superCategoryId : 2
        },
        {
            id:8,
            title:'قطعات یدکی و لوازم جانبی خودرو',
            superCategoryId : 2
        },
        {
            id:9,
            title:'موتورسیکلت و لوازم جانبی',
            superCategoryId : 2
        },
        {
            id:10,
            title:'قایق و لوازم جانبی',
            superCategoryId : 2
        },
    ]
}



export default MasterData;