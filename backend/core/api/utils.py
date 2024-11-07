from dateutil import parser


def change_date(x):
    return parser.parse(x).date()