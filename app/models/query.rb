# == Schema Information
#
# Table name: queries
#
#  id         :integer          not null, primary key
#  text       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Query < ActiveRecord::Base
  validates :text, presence: true

  has_many :diagnosis_selections
  has_many :diagnoses, through: :diagnosis_selections, source: :diagnosis
end
