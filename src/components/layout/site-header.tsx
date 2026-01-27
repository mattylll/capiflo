'use client';

import Link from 'next/link';

import {
    Banknote,
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
    Palette,
    PoundSterling,
    Receipt,
    Scissors,
    ShoppingBag,
    Tractor,
    Truck,
    TrendingUp,
    UtensilsCrossed,
    Warehouse,
    Briefcase,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';

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
    { title: 'North West', href: '/locations', counties: ['Greater Manchester', 'Lancashire', 'Merseyside', 'Cheshire'] },
    { title: 'London & South East', href: '/locations', counties: ['Greater London', 'Kent', 'Surrey', 'Sussex'] },
    { title: 'Midlands', href: '/locations', counties: ['West Midlands', 'Warwickshire', 'Nottinghamshire', 'Leicestershire'] },
    { title: 'Scotland', href: '/locations', counties: ['Lothian', 'Strathclyde', 'Grampian', 'Fife'] },
    { title: 'Wales', href: '/locations', counties: ['South Glamorgan', 'West Glamorgan', 'Gwent', 'Clwyd'] },
    { title: 'Northern Ireland', href: '/locations', counties: ['Antrim', 'Down', 'Armagh', 'Tyrone'] }
];

const SIMPLE_LINKS = [
    { label: 'Calculators', href: '/calculators', icon: Calculator },
    { label: 'Knowledge Centre', href: '/blog', icon: FileText },
    { label: 'Introducers', href: '/introducers', icon: Handshake },
    { label: 'About', href: '/about', icon: Building2 }
];

const SiteHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-2xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex shrink-0 items-center gap-3 text-lg font-semibold tracking-tight">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4db8] to-[#7b2873] text-sm font-bold text-white shadow shadow-[#ff4db8]/40">
                        CF
                    </span>
                    <div className="hidden whitespace-nowrap leading-tight sm:block">
                        <span className="block text-base font-semibold text-foreground">Capiflo</span>
                        <span className="text-xs font-medium text-muted-foreground">SME Finance Platform</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList>
                        {/* Home */}
                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        {/* Funding Dropdown */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground">
                                Funding
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="grid w-[500px] gap-1 p-2 md:grid-cols-2">
                                    {FUNDING_ITEMS.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link key={item.href} href={item.href} legacyBehavior passHref>
                                                <NavigationMenuLink className="group flex items-start gap-3 rounded-lg p-3 hover:bg-accent">
                                                    <div className="mt-0.5 rounded-lg bg-primary/15 p-2">
                                                        <Icon className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-foreground group-hover:text-primary">
                                                            {item.title}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                </NavigationMenuLink>
                                            </Link>
                                        );
                                    })}
                                    <Link href="/funding" legacyBehavior passHref>
                                        <NavigationMenuLink className="col-span-2 flex items-center justify-center gap-2 rounded-lg border border-dashed border-border p-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground">
                                            View all funding options
                                        </NavigationMenuLink>
                                    </Link>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        {/* Sectors Dropdown */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground">
                                Sectors
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="w-[600px] p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Industry Sectors
                                        </p>
                                        <Link
                                            href="/sectors"
                                            className="text-xs font-medium text-primary hover:underline">
                                            View all
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-3 gap-1">
                                        {SECTOR_ITEMS.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <Link key={item.href} href={item.href} legacyBehavior passHref>
                                                    <NavigationMenuLink className="group flex items-center gap-2 rounded-lg p-2 hover:bg-accent">
                                                        <div className="rounded-md bg-primary/15 p-1.5">
                                                            <Icon className="h-3.5 w-3.5 text-primary" />
                                                        </div>
                                                        <span className="text-sm text-foreground group-hover:text-primary">
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
                            <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground">
                                Locations
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="w-[500px] p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            UK Regions
                                        </p>
                                        <Link
                                            href="/locations"
                                            className="text-xs font-medium text-primary hover:underline">
                                            View all locations
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {LOCATION_REGIONS.map((region) => (
                                            <Link key={region.title} href="/locations" legacyBehavior passHref>
                                                <NavigationMenuLink className="group block rounded-lg p-3 hover:bg-accent">
                                                    <div className="flex items-center gap-2">
                                                        <div className="rounded-md bg-primary/15 p-1.5">
                                                            <MapPin className="h-3.5 w-3.5 text-primary" />
                                                        </div>
                                                        <span className="text-sm font-medium text-foreground group-hover:text-primary">
                                                            {region.title}
                                                        </span>
                                                    </div>
                                                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
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
                                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                                        {item.label}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Button size="sm" className="hidden sm:inline-flex" asChild>
                        <Link href="/contact">Check eligibility</Link>
                    </Button>
                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="lg:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="border-t border-white/10 bg-background/95 backdrop-blur-xl lg:hidden">
                    <div className="mx-auto max-w-6xl px-4 py-4">
                        {/* Main Links */}
                        <div className="space-y-1">
                            <Link
                                href="/"
                                className="flex items-center gap-3 rounded-lg p-3 text-foreground hover:bg-accent"
                                onClick={() => setMobileMenuOpen(false)}>
                                <Home className="h-4 w-4 text-primary" />
                                Home
                            </Link>
                        </div>

                        {/* Funding Section */}
                        <div className="mt-4">
                            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Funding
                            </p>
                            <div className="space-y-1">
                                {FUNDING_ITEMS.slice(0, 4).map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="flex items-center gap-3 rounded-lg p-3 text-foreground hover:bg-accent"
                                            onClick={() => setMobileMenuOpen(false)}>
                                            <Icon className="h-4 w-4 text-primary" />
                                            {item.title}
                                        </Link>
                                    );
                                })}
                                <Link
                                    href="/funding"
                                    className="flex items-center gap-3 rounded-lg p-3 text-sm text-primary hover:bg-accent"
                                    onClick={() => setMobileMenuOpen(false)}>
                                    View all funding →
                                </Link>
                            </div>
                        </div>

                        {/* Sectors Section */}
                        <div className="mt-4">
                            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Popular Sectors
                            </p>
                            <div className="grid grid-cols-2 gap-1">
                                {SECTOR_ITEMS.slice(0, 6).map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="flex items-center gap-2 rounded-lg p-2 text-sm text-foreground hover:bg-accent"
                                            onClick={() => setMobileMenuOpen(false)}>
                                            <Icon className="h-4 w-4 text-primary" />
                                            {item.title}
                                        </Link>
                                    );
                                })}
                            </div>
                            <Link
                                href="/sectors"
                                className="mt-2 flex items-center gap-3 rounded-lg p-3 text-sm text-primary hover:bg-accent"
                                onClick={() => setMobileMenuOpen(false)}>
                                View all sectors →
                            </Link>
                        </div>

                        {/* Locations Section */}
                        <div className="mt-4">
                            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                UK Locations
                            </p>
                            <div className="grid grid-cols-2 gap-1">
                                {LOCATION_REGIONS.slice(0, 4).map((region) => (
                                    <Link
                                        key={region.title}
                                        href="/locations"
                                        className="flex items-center gap-2 rounded-lg p-2 text-sm text-foreground hover:bg-accent"
                                        onClick={() => setMobileMenuOpen(false)}>
                                        <MapPin className="h-4 w-4 text-primary" />
                                        {region.title}
                                    </Link>
                                ))}
                            </div>
                            <Link
                                href="/locations"
                                className="mt-2 flex items-center gap-3 rounded-lg p-3 text-sm text-primary hover:bg-accent"
                                onClick={() => setMobileMenuOpen(false)}>
                                View all locations →
                            </Link>
                        </div>

                        {/* Other Links */}
                        <div className="mt-4 border-t border-white/10 pt-4">
                            {SIMPLE_LINKS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-3 rounded-lg p-3 text-foreground hover:bg-accent"
                                        onClick={() => setMobileMenuOpen(false)}>
                                        <Icon className="h-4 w-4 text-primary" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* CTA */}
                        <div className="mt-4 border-t border-white/10 pt-4">
                            <Button className="w-full" asChild>
                                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
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
