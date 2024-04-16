import { IoBusinessSharp  } from "react-icons/io5";
import { MdLaptopMac, MdOutlineManageAccounts } from "react-icons/md";
import { IoReader, IoLogoYoutube, IoLogoFacebook, IoLogoInstagram, IoLogoPinterest } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import { LuUsers, LuFolderEdit, LuLibrary } from "react-icons/lu";

export const user = [
    {
        title: "Projects",
        slug: "/studio/projects"
    },
    {
        title: "Teams",
        slug: "/studio/teams"
    },
    {
        title: "Account",
        slug: "/studio/account"
    },
]

export const account = [
    {
        title: "Projects",
        icon: LuFolderEdit,
        slug: "/studio/projects"
    },
    {
        title: "Teams",
        icon: LuUsers,
        links: [
            {
                title: "Team 1",
                slug: ""
            },
            {
                title: "Team 2",
                slug: ""
            },
        ],
        slug: "/studio/teams"
    },
    {
        title: "Account",
        icon: MdOutlineManageAccounts,
        links: [
            {
                title: "Profile",
                slug: ""
            },
            {
                title: "Billing",
                slug: ""
            },
            {
                title: "Settings",
                slug: ""
            },
        ],
        slug: "/studio/account"
    },
    {
        title: "Resources",
        icon: LuLibrary,
        links: [
            {
                title: "Documentation",
                slug: ""
            },
            {
                title: "Help Center",
                slug: ""
            },
            {
                title: "Contact",
                slug: ""
            },
        ],
        slug: "/studio/resources"
    },
]

export const social = [
    {
        title: "Facebook",
        link: "",
        icon: IoLogoFacebook 
    },
    {
        title: "Instagram",
        link: "",
        icon: IoLogoInstagram 
    },
    {
        title: "X",
        link: "",
        icon: BsTwitterX
    },
    {
        title: "LinkedIn",
        link: "",
        icon: FaLinkedinIn
    },
    {
        title: "Pinterest",
        link: "",
        icon: IoLogoPinterest 
    },
    {
        title: "YouTube",
        link: "",
        icon: IoLogoYoutube 
    },
]

export const nav = [
    {
        title: "Solutions",
        icon: MdLaptopMac,
        links: [
            {
                title: "Premium Grade Websites",
                slug: "/web-development"
            },
            {
                title: "Mobile App Development",
                slug: "/mobile-app-development"
            },
            {
                title: "Custom Integrations",
                slug: "/custom-software-integrations"
            },
            {
                title: "Digital Services",
                slug: "/digital-marketing-services"
            },
            {
                title: "Consultations",
                slug: "/technology-consulting"
            },
        ],
        slug: '/solutions'
    },
    {
        title: "Resources",
        icon: IoReader,
        links: [
            {
                title: "Blog",
                slug: "/blog"
            },
            {
                title: "Case Studies",
                slug: "/case-studies"
            },
            {
                title: "FAQ",
                slug: "/frequently-asked-questions"
            },
            {
                title: "Help Center",
                slug: "/help-center"
            },
        ],
        slug:"/resources"
    },
    {
        title: "Company",
        icon: IoBusinessSharp,
        links: [
            {
                title: "About Us",
                slug: "/about"
            },
            {
                title: "Contact Us",
                slug: "/contact"
            },
        ],
        slug: "/company"
    },
]