'use client';

import { useMemo, useState } from 'react';

import type { CalcField, CalculatorBlock } from '@/data/calculators';
import { compute, type InputValues } from '@/lib/calculators/engine';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/registry/new-york-v4/ui/select';

const initialValues = (fields: CalcField[]): InputValues =>
    fields.reduce<InputValues>((acc, f) => {
        acc[f.id] = f.default;
        return acc;
    }, {});

const FieldControl = ({
    field,
    value,
    onChange
}: {
    field: CalcField;
    value: number | string;
    onChange: (v: number | string) => void;
}) => {
    if (field.type === 'select') {
        return (
            <Select value={String(value)} onValueChange={(v) => onChange(v)}>
                <SelectTrigger id={field.id} className='h-11'>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {field.options?.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        );
    }

    const isCurrency = field.type === 'currency';
    const isPercent = field.type === 'percent';

    return (
        <div className='relative'>
            {isCurrency && (
                <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>£</span>
            )}
            <Input
                id={field.id}
                type='number'
                inputMode='decimal'
                value={value === '' ? '' : String(value)}
                min={field.min}
                max={field.max}
                step={field.step}
                onChange={(e) => {
                    const raw = e.target.value;
                    onChange(raw === '' ? '' : Number(raw));
                }}
                className={`h-11 ${isCurrency ? 'pl-7' : ''} ${isPercent || field.suffix ? 'pr-16' : ''}`}
            />
            {(isPercent || field.suffix) && (
                <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground'>
                    {isPercent ? '%' : field.suffix}
                </span>
            )}
        </div>
    );
};

export function CalculatorTool({ calculator }: { calculator: CalculatorBlock }) {
    const [values, setValues] = useState<InputValues>(() => initialValues(calculator.fields));

    const results = useMemo(() => {
        // Treat blank fields as 0 so the engine stays defensive while typing.
        const safe: InputValues = {};
        for (const f of calculator.fields) {
            const v = values[f.id];
            safe[f.id] = v === '' ? (f.type === 'select' ? f.default : 0) : v;
        }

        return compute(calculator.engine, safe);
    }, [values, calculator]);

    const setField = (id: string, v: number | string) => setValues((prev) => ({ ...prev, [id]: v }));

    return (
        <div className='grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 lg:grid-cols-[1fr_1fr]'>
            {/* Inputs */}
            <div className='bg-card p-6 sm:p-8'>
                <h2 className='text-sm font-semibold uppercase tracking-wider text-foreground'>Your figures</h2>
                <div className='mt-6 space-y-5'>
                    {calculator.fields.map((field) => (
                        <div key={field.id}>
                            <Label htmlFor={field.id} className='text-sm font-medium text-foreground'>
                                {field.label}
                            </Label>
                            <div className='mt-2'>
                                <FieldControl
                                    field={field}
                                    value={values[field.id]}
                                    onChange={(v) => setField(field.id, v)}
                                />
                            </div>
                            {field.help && <p className='mt-1.5 text-xs text-muted-foreground'>{field.help}</p>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Results */}
            <div className='bg-muted/40 p-6 sm:p-8'>
                <h2 className='text-sm font-semibold uppercase tracking-wider text-foreground'>Your results</h2>
                <div className='mt-6 space-y-4'>
                    {results.map((row) =>
                        row.primary ? (
                            <div key={row.label} className='rounded-2xl bg-primary/10 p-5'>
                                <p className='text-sm font-medium text-muted-foreground'>{row.label}</p>
                                <p className='mt-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>
                                    {row.value}
                                </p>
                                {row.hint && <p className='mt-1 text-sm text-muted-foreground'>{row.hint}</p>}
                            </div>
                        ) : (
                            <div
                                key={row.label}
                                className='flex items-baseline justify-between gap-4 border-b border-border/50 pb-3'>
                                <div>
                                    <p className='text-sm text-muted-foreground'>{row.label}</p>
                                    {row.hint && <p className='text-xs text-muted-foreground/80'>{row.hint}</p>}
                                </div>
                                <p className='shrink-0 text-lg font-semibold text-foreground'>{row.value}</p>
                            </div>
                        )
                    )}
                </div>
                <p className='mt-6 text-xs leading-relaxed text-muted-foreground'>{calculator.resultsNote}</p>
            </div>
        </div>
    );
}
