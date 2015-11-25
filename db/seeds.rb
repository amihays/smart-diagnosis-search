# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

diagnoses = File.readlines("db/diagnoses.txt").map { |diagnosis| {name: diagnosis.chomp} }
Diagnosis.create(diagnoses)

queries = Query.create([{ text: "heada" },
                        { text: "head" },
                        { text: "h" },
                        { text: "he" },
                        { text: "hea" }])
