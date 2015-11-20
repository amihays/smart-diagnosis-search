# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# diagnoses = File.readlines("db/diagnoses.txt").map { |diagnosis| {name: diagnosis.chomp} }
# Diagnosis.create(diagnoses)

queries = Query.create([{ text: "heada" },
                        { text: "head" },
                        { text: "h" },
                        { text: "he" },
                        { text: "hea" }])

chronic = Diagnosis.find_by(name: 'Chronic cluster headache')
episodic = Diagnosis.find_by(name: 'Episodic cluster headache')
unspecified = Diagnosis.find_by(name: 'Cluster headache syndrome, unspecified')
trichomoniasis = Diagnosis.find_by(name: 'Trichomoniasis')
trauma = Diagnosis.find_by(name: 'Post-traumatic headache, unspecified')
acute = Diagnosis.find_by(name: 'Acute post-traumatic headache')

DiagnosisSelection.create([{ query_id: queries[0].id, diagnosis_id: chronic.id },
                           { query_id: queries[0].id, diagnosis_id: chronic.id },
                           { query_id: queries[0].id, diagnosis_id: episodic.id },
                           { query_id: queries[0].id, diagnosis_id: trauma.id },
                           { query_id: queries[0].id, diagnosis_id: acute.id },
                           { query_id: queries[0].id, diagnosis_id: unspecified.id },
                           { query_id: queries[1].id, diagnosis_id: unspecified.id },
                           { query_id: queries[1].id, diagnosis_id: unspecified.id },
                           { query_id: queries[2].id, diagnosis_id: trichomoniasis.id },
                           { query_id: queries[2].id, diagnosis_id: trichomoniasis.id },
                           { query_id: queries[2].id, diagnosis_id: trichomoniasis.id },
                           { query_id: queries[2].id, diagnosis_id: trichomoniasis.id },
                           { query_id: queries[2].id, diagnosis_id: trichomoniasis.id },
                           { query_id: queries[3].id, diagnosis_id: chronic.id },
                           { query_id: queries[3].id, diagnosis_id: chronic.id }])
