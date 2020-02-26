const {
    insertExpandedOneOrMoreOperator,
    insertExplicitConcatOperator,
    toPostfix
} = require('../src/parser');

describe('insertExpandedOneOrMoreOperator tests', () => {
    test('call with "" should return ""', () => {
        expect(insertExpandedOneOrMoreOperator('')).toEqual('');
    });
    test('call with "ab*c" should return "ab*c"', () => {
        expect(insertExpandedOneOrMoreOperator('ab*c')).toEqual('ab*c');
    });
    test('call with "a+" should return "(aa*)"', () => {
        expect(insertExpandedOneOrMoreOperator('a+')).toEqual('(aa*)');
    });
    test('call with "ab+c" should return "a(bb*)c"', () => {
        expect(insertExpandedOneOrMoreOperator('ab+c')).toEqual('a(bb*)c');
    });
    test('call with "uv+(a|b)+cw+" should return "u(vv*)((a|b)(a|b)*)c(ww*)"', () => {
        expect(insertExpandedOneOrMoreOperator('uv+(a|b)+cw+')).toEqual('u(vv*)((a|b)(a|b)*)c(ww*)');
    });
});

describe('insertExplicitConcatOperator tests', () => {
    test('call with "" should return ""', () => {
        expect(insertExplicitConcatOperator('')).toEqual('');
    });

    test('call with "a*" should return "a*"', () => {
        expect(insertExplicitConcatOperator('a*')).toEqual('a*');
    });

    test('call with "a|b" should return "a|b"', () => {
        expect(insertExplicitConcatOperator('a|b')).toEqual('a|b');
    });

    test('call with "ab" should return "a.b"', () => {
        expect(insertExplicitConcatOperator('ab')).toEqual('a.b');
    });

    test('call with "abcabc" should return "a.b.c.a.b.c"', () => {
        expect(insertExplicitConcatOperator('abcabc')).toEqual('a.b.c.a.b.c');
    });

    test('call with "ab*" should return "a.b*"', () => {
        expect(insertExplicitConcatOperator('ab*')).toEqual('a.b*');
    });

    test('call with "ab*" should return "a*b*"', () => {
        expect(insertExplicitConcatOperator('a*b*')).toEqual('a*.b*');
    });

    test('call with "ab*c" should return "a.b*.c"', () => {
        expect(insertExplicitConcatOperator('ab*c')).toEqual('a.b*.c');
    });

    test('call with "ab*(cdd)" should return "a.b*.(c.d.d)"', () => {
        expect(insertExplicitConcatOperator('ab*(cdd)')).toEqual('a.b*.(c.d.d)');
    });

    test('call with "(a|b)*c" should return "(a|b)*.c"', () => {
        expect(insertExplicitConcatOperator('(a|b)*c')).toEqual('(a|b)*.c');
    });
});

describe('toPostfix tests', () => {
    test('call with "" should return ""', () => {
        expect(toPostfix('')).toEqual('');
    });

    test('call with "a" should return "a"', () => {
        expect(toPostfix('a')).toEqual('a');
    });

    test('call with "a.b" should return "ab."', () => {
        expect(toPostfix('a.b')).toEqual('ab.');
    });

    test('call with "a*" should return "a*"', () => {
        expect(toPostfix('a*')).toEqual('a*');
    });

    test('call with "a*.b" should return "a*b."', () => {
        expect(toPostfix('a*.b')).toEqual('a*b.');
    });

    test('call with "a.b|c.d" should return "ab.cd.|"', () => {
        expect(toPostfix('a.b|c.d')).toEqual('ab.cd.|');
    });

    test('call with "a|b*" should return "ab*|"', () => {
        expect(toPostfix('a|b*')).toEqual('ab*|');
    });

    test('call with "a.(b|c)*.d" should return "abc|*.d."', () => {
        expect(toPostfix('a.(b|c)*.d')).toEqual('abc|*.d.');
    });

    test('call with ((a.b)) should return ab.', () => {
        expect(toPostfix('((a.b))')).toEqual('ab.');
    });

    test('call with ((a.b)*) should return ab.*', () => {
        expect(toPostfix('((a.b)*)')).toEqual('ab.*');
    });

    test('call with "(a|b)*cd" should return "ab|*c.d."', () => {
        expect(toPostfix('(a|b)*.c.d')).toEqual('ab|*c.d.');
    });
});

