'use client';

import { useState } from 'react';

import Link from 'next/link';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from '@/registry/new-york-v4/ui/navigation-menu';

import {
    Banknote,
    Briefcase,
    Building2,
    Calculator,
    Car,
    CreditCard,
    Factory,
    FileText,
    GraduationCap,
    Hammer,
    Handshake,
    Heart,
    Home,
    Laptop,
    MapPin,
    Menu,
    Palette,
    PoundSterling,
    Receipt,
    Scissors,
    ShoppingBag,
    Tractor,
    TrendingUp,
    Truck,
    UtensilsCrossed,
    Warehouse,
    X
} from 'lucide-react';

const FUNDING_ITEMS = [
    {
        title: 'Business Loans',
        href: '/funding/business-loans',
        description: 'Flexible term loans from £5k to £500k',
        icon: Banknote
    },
    {
        title: 'Invoice Finance',
        href: '/funding/invoice-finance',
        description: 'Release cash tied up in unpaid invoices',
        icon: FileText
    },
    {
        title: 'Merchant Cash Advance',
        href: '/funding/merchant-cash-advance',
        description: 'Funding repaid through card sales',
        icon: CreditCard
    },
    {
        title: 'Asset Finance',
        href: '/funding/asset-finance',
        description: 'Spread equipment costs over time',
        icon: TrendingUp
    },
    {
        title: 'VAT Loans',
        href: '/funding/vat-loans',
        description: 'Spread quarterly VAT payments',
        icon: Receipt
    },
    {
        title: 'Corporation Tax Loans',
        href: '/funding/corporation-tax-loans',
        description: 'Finance your tax obligations',
        icon: PoundSterling
    }
];

const SECTOR_ITEMS = [
    { title: 'Construction', href: '/sectors/construction', icon: Hammer },
    { title: 'Retail', href: '/sectors/retail', icon: ShoppingBag },
    { title: 'Professional Services', href: '/sectors/professional-services', icon: Briefcase },
    { title: 'Hospitality', href: '/sectors/hospitality', icon: UtensilsCrossed },
    { title: 'Manufacturing', href: '/sectors/manufacturing', icon: Factory },
    { title: 'Healthcare', href: '/sectors/healthcare', icon: Heart },
    { title: 'Transport', href: '/sectors/transport', icon: Truck },
    { title: 'Technology', href: '/sectors/technology', icon: Laptop },
    { title: 'Wholesale', href: '/sectors/wholesale', icon: Warehouse },
    { title: 'Agriculture', href: '/sectors/agriculture', icon: Tractor },
    { title: 'Beauty & Wellness', href: '/sectors/beauty-wellness', icon: Scissors },
    { title: 'Automotive', href: '/sectors/automotive', icon: Car },
    { title: 'Education', href: '/sectors/education', icon: GraduationCap },
    { title: 'Real Estate', href: '/sectors/real-estate', icon: Building2 },
    { title: 'Creative', href: '/sectors/creative', icon: Palette }
];

const LOCATION_REGIONS = [
    {
        title: 'North West',
        href: '/locations',
        counties: ['Greater Manchester', 'Lancashire', 'Merseyside', 'Cheshire']
    },
    { title: 'London & South East', href: '/locations', counties: ['Greater London', 'Kent', 'Surrey', 'Sussex'] },
    {
        title: 'Midlands',
        href: '/locations',
        counties: ['West Midlands', 'Warwickshire', 'Nottinghamshire', 'Leicestershire']
    },
    { title: 'Scotland', href: '/locations', counties: ['Lothian', 'Strathclyde', 'Grampian', 'Fife'] },
    { title: 'Wales', href: '/locations', counties: ['South Glamorgan', 'West Glamorgan', 'Gwent', 'Clwyd'] },
    { title: 'Northern Ireland', href: '/locations', counties: ['Antrim', 'Down', 'Armagh', 'Tyrone'] }
];

const SIMPLE_LINKS = [
    { label: 'Calculators', href: '/calculators', icon: Calculator },
    { label: 'Guides', href: '/guides', icon: GraduationCap },
    { label: 'Introducers', href: '/introducers', icon: Handshake },
    { label: 'About', href: '/about', icon: Building2 }
];

const SiteHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className='border-border bg-background/90 sticky top-0 z-40 border-b backdrop-blur-md'>
            <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8'>
                {/* Logo */}
                <Link href='/' className='flex shrink-0 items-center gap-3 text-lg font-semibold tracking-tight'>
                    <span className='border-primary text-primary inline-flex h-10 w-10 items-center justify-center border-2 font-mono text-sm font-bold'>
                        C/F
                    </span>
                    <div className='hidden leading-tight whitespace-nowrap sm:block'>
                        <span className='font-display text-foreground block text-base font-semibold'>Capiflo</span>
                        <span className='text-muted-foreground font-mono text-[10px] font-medium tracking-[0.18em] uppercase'>
                            SME finance broker
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <NavigationMenu className='hidden lg:flex'>
                    <NavigationMenuList>
                        {/* Home */}
                        <NavigationMenuItem>
                            <Link href='/' legacyBehavior passHref>
                                <NavigationMenuLink className='group text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors'>
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        {/* Funding Dropdown */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className='text-muted-foreground hover:text-foreground bg-transparent'>
                                Funding
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className='grid w-[500px] gap-1 p-2 md:grid-cols-2'>
                                    {FUNDING_ITEMS.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <Link key={item.href} href={item.href} legacyBehavior passHref>
                                                <NavigationMenuLink className='group hover:bg-accent flex items-start gap-3 rounded-lg p-3'>
                                                    <div className='bg-primary/15 mt-0.5 rounded-lg p-2'>
                                                        <Icon className='text-primary h-4 w-4' />
                                                    </div>
                                                    <div>
                                                        <div className='text-foreground group-hover:text-primary text-sm font-medium'>
                                                            {item.title}
                                                        </div>
                                                        <div className='text-muted-foreground text-xs'>
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                </NavigationMenuLink>
                                            </Link>
                                        );
                                    })}
                                    <Link href='/funding' legacyBehavior passHref>
                                        <NavigationMenuLink className='border-border text-muted-foreground hover:bg-accent hover:text-foreground col-span-2 flex items-center justify-center gap-2 rounded-lg border border-dashed p-3 text-sm font-medium'>
                                            View all funding options
                                        </NavigationMenuLink>
                                    </Link>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        {/* Sectors Dropdown */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className='text-muted-foreground hover:text-foreground bg-transparent'>
                                Sectors
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className='w-[600px] p-4'>
                                    <div className='mb-3 flex items-center justify-between'>
                                        <p className='text-muted-foreground text-xs font-semibold tracking-wider uppercase'>
                                            Industry Sectors
                                        </p>
                                        <Link
                                            href='/sectors'
                                            className='text-primary text-xs font-medium hover:underline'>
                                            View all
                                        </Link>
                                    </div>
                                    <div className='grid grid-cols-3 gap-1'>
                                        {SECTOR_ITEMS.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <Link key={item.href} href={item.href} legacyBehavior passHref>
                                                    <NavigationMenuLink className='group hover:bg-accent flex items-center gap-2 rounded-lg p-2'>
                                                        <div className='bg-primary/15 rounded-md p-1.5'>
                                                            <Icon className='text-primary h-3.5 w-3.5' />
                                                        </div>
                                                        <span className='text-foreground group-hover:text-primary text-sm'>
                                                            {item.title}
                                                        </span>
                                                    </NavigationMenuLink>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        {/* Locations Dropdown */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className='text-muted-foreground hover:text-foreground bg-transparent'>
                                Locations
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className='w-[500px] p-4'>
                                    <div className='mb-3 flex items-center justify-between'>
                                        <p className='text-muted-foreground text-xs font-semibold tracking-wider uppercase'>
                                            UK Regions
                                        </p>
                                        <Link
                                            href='/locations'
                                            className='text-primary text-xs font-medium hover:underline'>
                                            View all locations
                                        </Link>
                                    </div>
                                    <div className='grid grid-cols-2 gap-3'>
                                        {LOCATION_REGIONS.map((region) => (
                                            <Link key={region.title} href='/locations' legacyBehavior passHref>
                                                <NavigationMenuLink className='group hover:bg-accent block rounded-lg p-3'>
                                                    <div className='flex items-center gap-2'>
                                                        <div className='bg-primary/15 rounded-md p-1.5'>
                                                            <MapPin className='text-primary h-3.5 w-3.5' />
                                                        </div>
                                                        <span className='text-foreground group-hover:text-primary text-sm font-medium'>
                                                            {region.title}
                                                        </span>
                                                    </div>
                                                    <p className='text-muted-foreground mt-1 line-clamp-1 text-xs'>
                                                        {region.counties.join(' · ')}
                                                    </p>
                                                </NavigationMenuLink>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        {/* Simple Links */}
                        {SIMPLE_LINKS.map((item) => (
                            <NavigationMenuItem key={item.label}>
                                <Link href={item.href} legacyBehavior passHref>
                                    <NavigationMenuLink className='group text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors'>
                                        {item.label}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right Side Actions */}
                <div className='flex items-center gap-2'>
                    <ModeToggle />
                    <Button size='sm' className='hidden sm:inline-flex' asChild>
                        <Link href='/contact'>Check eligibility</Link>
                    </Button>
                    {/* Mobile Menu Toggle */}
                    <Button
                        variant='ghost'
                        size='sm'
                        className='lg:hidden'
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className='bg-background/95 border-t border-white/10 backdrop-blur-xl lg:hidden'>
                    <div className='mx-auto max-w-6xl px-4 py-4'>
                        {/* Main Links */}
                        <div className='space-y-1'>
                            <Link
                                href='/'
                                className='text-foreground hover:bg-accent flex items-center gap-3 rounded-lg p-3'
                                onClick={() => setMobileMenuOpen(false)}>
                                <Home className='text-primary h-4 w-4' />
                                Home
                            </Link>
                        </div>

                        {/* Funding Section */}
                        <div className='mt-4'>
                            <p className='text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase'>
                                Funding
                            </p>
                            <div className='space-y-1'>
                                {FUNDING_ITEMS.slice(0, 4).map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className='text-foreground hover:bg-accent flex items-center gap-3 rounded-lg p-3'
                                            onClick={() => setMobileMenuOpen(false)}>
                                            <Icon className='text-primary h-4 w-4' />
                                            {item.title}
                                        </Link>
                                    );
                                })}
                                <Link
                                    href='/funding'
                                    className='text-primary hover:bg-accent flex items-center gap-3 rounded-lg p-3 text-sm'
                                    onClick={() => setMobileMenuOpen(false)}>
                                    View all funding →
                                </Link>
                            </div>
                        </div>

                        {/* Sectors Section */}
                        <div className='mt-4'>
                            <p className='text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase'>
                                Popular Sectors
                            </p>
                            <div className='grid grid-cols-2 gap-1'>
                                {SECTOR_ITEMS.slice(0, 6).map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className='text-foreground hover:bg-accent flex items-center gap-2 rounded-lg p-2 text-sm'
                                            onClick={() => setMobileMenuOpen(false)}>
                                            <Icon className='text-primary h-4 w-4' />
                                            {item.title}
                                        </Link>
                                    );
                                })}
                            </div>
                            <Link
                                href='/sectors'
                                className='text-primary hover:bg-accent mt-2 flex items-center gap-3 rounded-lg p-3 text-sm'
                                onClick={() => setMobileMenuOpen(false)}>
                                View all sectors →
                            </Link>
                        </div>

                        {/* Locations Section */}
                        <div className='mt-4'>
                            <p className='text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase'>
                                UK Locations
                            </p>
                            <div className='grid grid-cols-2 gap-1'>
                                {LOCATION_REGIONS.slice(0, 4).map((region) => (
                                    <Link
                                        key={region.title}
                                        href='/locations'
                                        className='text-foreground hover:bg-accent flex items-center gap-2 rounded-lg p-2 text-sm'
                                        onClick={() => setMobileMenuOpen(false)}>
                                        <MapPin className='text-primary h-4 w-4' />
                                        {region.title}
                                    </Link>
                                ))}
                            </div>
                            <Link
                                href='/locations'
                                className='text-primary hover:bg-accent mt-2 flex items-center gap-3 rounded-lg p-3 text-sm'
                                onClick={() => setMobileMenuOpen(false)}>
                                View all locations →
                            </Link>
                        </div>

                        {/* Other Links */}
                        <div className='mt-4 border-t border-white/10 pt-4'>
                            {SIMPLE_LINKS.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className='text-foreground hover:bg-accent flex items-center gap-3 rounded-lg p-3'
                                        onClick={() => setMobileMenuOpen(false)}>
                                        <Icon className='text-primary h-4 w-4' />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* CTA */}
                        <div className='mt-4 border-t border-white/10 pt-4'>
                            <Button className='w-full' asChild>
                                <Link href='/contact' onClick={() => setMobileMenuOpen(false)}>
                                    Check eligibility
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default SiteHeader;
