import { MapPin } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york-v4/ui/avatar';
import { Card } from '@/registry/new-york-v4/ui/card';

const TEAM_MEMBERS = [
    {
        name: 'Ella Shaw',
        title: 'Senior Funding Lead',
        location: 'London',
        image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80'
    },
    {
        name: 'Aaron Patel',
        title: 'SME Finance Specialist',
        location: 'Manchester',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'
    },
    {
        name: 'Nia Roberts',
        title: 'Property & Asset Finance',
        location: 'Cardiff',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    },
    {
        name: 'Samir Khan',
        title: 'Invoice Finance Advisor',
        location: 'Birmingham',
        image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80'
    }
];

const FundingTeamSection = () => {
    return (
        <section className='px-4 lg:px-8'>
            <Card className='mx-auto max-w-6xl rounded-3xl border-border/50 p-8 md:p-10 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                {/* Header */}
                <div className='flex flex-col gap-4'>
                    <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                        Meet your funding team
                    </p>
                    <h2 className='text-3xl font-semibold text-foreground sm:text-4xl'>
                        Dedicated UK-based specialists here for you.
                    </h2>
                    <p className='max-w-2xl text-muted-foreground'>
                        Real people guiding you through every stage — from calculators and data capture
                        to lender intros and deal closing.
                    </p>
                </div>

                {/* Team grid */}
                <div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                    {TEAM_MEMBERS.map((member, index) => (
                        <div
                            key={member.name}
                            className='rounded-2xl border border-border/50 bg-muted/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-4 duration-500'
                            style={{ animationDelay: `${index * 100 + 200}ms` }}>
                            <Avatar className='h-16 w-16 border-2 border-primary/20'>
                                <AvatarImage src={member.image} alt={member.name} />
                                <AvatarFallback className='bg-primary/15 text-primary'>
                                    {member.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className='mt-4'>
                                <p className='font-semibold text-foreground'>{member.name}</p>
                                <p className='text-sm text-muted-foreground'>{member.title}</p>
                                <p className='mt-2 flex items-center gap-1 text-xs text-muted-foreground'>
                                    <MapPin className='h-3 w-3' />
                                    {member.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </section>
    );
};

export default FundingTeamSection;
